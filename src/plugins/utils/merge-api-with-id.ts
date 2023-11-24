
export function mergeAPIWithID(apiURL: string, id: string) {
    try {
        return apiURL.replace('{requiresID}', id);
    }
    catch (err) {
        console.log('Error occurred while merging API with ID', err);
    }

}