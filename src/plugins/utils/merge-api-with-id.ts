
export function mergeAPIWithID(apiURL: string, id: string) {
    try {
        return apiURL.replace('{requiresID}', id);
    }
    catch (err) {
        throw new Error('Error occurred while merging API with ID');
    }

}