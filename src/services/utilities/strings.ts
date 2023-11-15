export function capitalizeFirstLetter(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
}
export function removeUnderscoresAndCapitalize(inputString: string): string {
    // Split the input string by underscores and capitalize each word
    const words: string[] = inputString.split('_').map((word: string) => {
        // Capitalize the first letter and make the rest lowercase
        return word;
    });

    const res = words.join(" ");
    return capitalizeFirstLetter(res)
}