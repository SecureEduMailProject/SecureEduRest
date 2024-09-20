import { FastifyReply, FastifyRequest } from 'fastify';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { htmlToText } from 'html-to-text';

/**
 * Handle the request to fetch and parse Atom feeds from multiple repositories.
 *
 * @param request
 * @param reply
 */
export default async function getReleasesHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Define Atom feed URLs for the three repositories
    const feedUrls = [
      'https://github.com/secureedumailproject/secureedumail/releases.atom',
      'https://github.com/secureedumailproject/secureedurest/releases.atom',
      'https://github.com/secureedumailproject/secureeducrypt/releases.atom'
    ];

    // Fetch all Atom feeds concurrently
    const responses = await Promise.all(feedUrls.map(url => axios.get(url)));

    // Parse XML responses to JSON
    const parser = new XMLParser();
    const allEntries = responses.flatMap((response, index) => {
      const result = parser.parse(response.data);

      // Ensure result has the expected structure
      if (!result.feed || !result.feed.entry) {
        throw new Error(`Unexpected XML structure for feed at index ${index}`);
      }

      // Ensure entries is always an array (handles both single and multiple entries)
      const entriesData = Array.isArray(result.feed.entry) ? result.feed.entry : [result.feed.entry];

      // Extract relevant data from each entry
      return entriesData.map((entry: any) => {
        // Convert HTML content to text
        const contentText = htmlToText(entry.content || '', {
          wordwrap: 130
        });

        // Extract specific data from contentText using regex
        const idMatch = contentText.match(/ID:\s*(\d+)/);
        const dateMatch = contentText.match(/Date:\s*([\d-]+)/);
        const versionMatch = contentText.match(/Version:\s*([\w.]+)/);
        const tagMatch = contentText.match(/Tag:\s*(\w+)/);
        const nameMatch = contentText.match(/Name:\s*'([^']+)'/);
        const typeMatch = contentText.match(/Type:\s*'([^']+)'/);  // Extraction du champ Type
        const downloadLinkMatch = contentText.match(/Download Link:\s*'(https:\/\/[^']+)'/);
        const githubLinkMatch = contentText.match(/GitHub\n\[(https:\/\/[^]]+)\]/);

        return {
          id: idMatch ? parseInt(idMatch[1], 10) : -1,  // Convert ID to a number for proper sorting
          date: dateMatch ? dateMatch[1] : 'Unknown',
          version: versionMatch ? versionMatch[1] : 'Unknown',
          tag: tagMatch ? tagMatch[1] : 'Unknown',
          name: nameMatch ? nameMatch[1] : 'Unknown',
          type: typeMatch ? typeMatch[1] : 'Unknown',  // Ajout du champ Type
          downloadLink: downloadLinkMatch ? downloadLinkMatch[1] : 'No link found',
          githubLink: githubLinkMatch ? githubLinkMatch[1] : 'No link found',
        };
      });
    });

    // Sort the entries by ID (from highest to lowest)
    const sortedEntries = allEntries.sort((a, b) => b.id - a.id);  // Sort descending by ID

    reply.code(200).send({ entries: sortedEntries });
  } catch (error) {
    console.error('Error:', error); // Log the error

    reply.code(500).send({
      err: false,
      msg: "Failed to fetch or parse one or more Atom feeds",
    });
  }
}
