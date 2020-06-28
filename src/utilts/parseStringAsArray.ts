export const parseStringAsArray = (arrayAsString: string): string[] => {
    return arrayAsString.split(',').map((tech: string)=>tech.trim());
}