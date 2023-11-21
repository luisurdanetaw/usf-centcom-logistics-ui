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

export function splitCamelCaseAndCapitalize(inputString: string) {
    // Use a regular expression to split the camelCase string
    const words = inputString.split(/(?=[A-Z])/);

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    // Join the words with a space
    const result = capitalizedWords.join(' ');

    return result;
}