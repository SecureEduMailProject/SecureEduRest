import * as fs from "fs";
import * as path from "path";

/**
 * Get all files from a directory recursively
 * @param directoryPath
 */
export const getAllFilesRecursive = (directoryPath: string): string[] => {
    const files: string[] = [];
    const items = fs.readdirSync(directoryPath);

    for (const item of items) {
        const itemPath = path.join(directoryPath, item);
        const isFile = fs.statSync(itemPath).isFile();
        if (isFile)
            files.push(itemPath);
        else {
            const subDirectoryFiles = getAllFilesRecursive(itemPath);
            files.push(...subDirectoryFiles);
        }
    }

    return files;
}