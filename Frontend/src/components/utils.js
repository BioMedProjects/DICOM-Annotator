export let getUnlabeledImages = async () => {
    let data = await fetch('http://127.0.0.1:8000/dicom_annotator/list_dicoms').then(response => response.json());
    let unlabeledImages = [];
    for (let record of data)
        if (record.is_labeled === false) unlabeledImages.push(record);
    return unlabeledImages;
}
