const mapServices = (result) => {
    console.log('MMMANNNNANNN', result);
    let retVal = [];
    if (result) {
        const { records } = result;
        if (records && records.length > 0) {
            records.map((element) => {
                let category = '';
                if (element.categ_id && element.categ_id[1]) {
                    const categoryFullPath = element.categ_id[1].split('/ ');
                    category = categoryFullPath[categoryFullPath.length - 1];
                }
                const val = {
                    id: element.id,
                    name: `[${category}] ${element.name}`,
                };
                retVal = retVal.concat(val);
                return null;
            });
        }
    }
    console.log('sdfasdjf', retVal);
    return retVal;
};

export default mapServices;
