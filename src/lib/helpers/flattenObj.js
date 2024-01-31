
export const flattenObj = (ob) => {
    let result = {};
    for (const i in ob) {
        if ((typeof ob[i]) === 'object' && !Array.isArray(ob[i])) {
            const temp = flattenObj(ob[i]);
            for (const j in temp) {

                result[j] = temp[j];
            }
        }
        else {
            result[i] = ob[i];
        }
    }
    return result;
};