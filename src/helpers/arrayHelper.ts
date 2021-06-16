
export const findIndexById = (array: Record<string, any>, id: string) => {
    return array.findIndex((item: Record<string, any>) => item.id === id);
}
