import { FastifyReply, FastifyRequest } from 'fastify';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { htmlToText } from 'html-to-text';

/**
 * Handle the request to fetch and parse Atom feed.
 *
 * @param request
 * @param reply
 */
export default async function getReleasesHandler(request: FastifyRequest, reply: FastifyReply) {
  try {
    // Fetch the Atom feed
    const { data: xmlData } = await axios.get('https://github.com/secureedumailproject/secureedumail/releases.atom');
    
    // Parse XML to JSON
    const parser = new XMLParser();
    const result = parser.parse(xmlData);

    // Ensure result has the expected structure
    if (!result.feed || !result.feed.entry) {
      throw new Error('Unexpected XML structure');
    }

    // Extract entries
    const entries = result.feed.entry.map((entry: any) => {
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
      const downloadLinkMatch = contentText.match(/Download Link:\s*'(https:\/\/[^']+)'/);
      const githubLinkMatch = contentText.match(/GitHub\n\[(https:\/\/[^]]+)\]/);

      return {
        id: idMatch ? idMatch[1] : 'Unknown',
        date: dateMatch ? dateMatch[1] : 'Unknown',
        version: versionMatch ? versionMatch[1] : 'Unknown',
        tag: tagMatch ? tagMatch[1] : 'Unknown',
        name: nameMatch ? nameMatch[1] : 'Unknown',
        downloadLink: downloadLinkMatch ? downloadLinkMatch[1] : 'No link found',
        githubLink: githubLinkMatch ? githubLinkMatch[1] : 'No link found',
      };
    });

    reply.code(200).send({ entries });
  } catch (error) {
    console.error('Error:', error); // Log the error
    reply.code(500).send({ error: 'Failed to fetch or parse the Atom feed' });
  }
}
