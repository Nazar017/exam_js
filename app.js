export function addToLocalStorage() {
    let array = [];

    const localStorageData = localStorage.getItem('pairs'); // отримання даних з локалстореджу

    if (localStorageData !== null) { // якщо дані присутні то пушимо в наш новий масив
        array = JSON.parse(localStorage.getItem('pairs'))
    }

    const inputData = document.getElementById('input-one');
    if (inputData.value.split('=').length < 2) { // робимо перевірку на валідність введення
        throw Error('Format type is invalid')
    }
    array.push(inputData.value.trim());
    localStorage.setItem('pairs', JSON.stringify(array)); // вкладаємо нові дані в локасторедж

    const resultArray = JSON.parse(localStorage.getItem('pairs'))
    const textAreaData = document.getElementById('textarea');

    textAreaData.value = resultArray.join('\n'); // робимо коректний вивід
    inputData.value = '' // оновлюємо значення після відпрацювання

}

export function deleteAll() {
    localStorage.clear(); // очистка локалстореджу
    const textAreaData = document.getElementById('textarea');

    textAreaData.value = '' // оновлюємо значення після відпрацювання
}

// export function sortBy(param) {
//     const textAreaData = document.getElementById('textarea');
//     const localStorageData = localStorage.getItem('pairs');
//
//     if(localStorageData === null){
//         textAreaData.value = 'The localStorage is empty'
//         throw Error('The localStorage is empty');
//     }
//     const arr = JSON.parse(localStorageData);
//     const newArr = [];
//
//     for (let i = 0; i < arr.length; i++) {
//         const arrElement = arr[i];
//         const lengthArrElement = arrElement.split('=')[param === 'name' ? 0 : 1].length;
//         newArr.push({
//             length: lengthArrElement,
//             element: arrElement
//         })
//     }
//
//     newArr.sort((a, b) => a.length - b.length);
//
//     const transformedArray = newArr.map(obj => obj.element);
//
//     textAreaData.value = transformedArray.join('\n');
// }
export function sortBy(param) {
    const textAreaData = document.getElementById('textarea');
    const localStorageData = localStorage.getItem('pairs');

    if (!localStorageData) { // робимо перевірку чи дані є які ми отримали з локалстореджу
        textAreaData.value = 'The localStorage is empty';
        throw new Error('The localStorage is empty');
    }

    const arr = JSON.parse(localStorageData);

    if (arr.some(item => typeof item !== 'string')) { // згадно з ТЗ зробив перевірку на тільки тим стрінг, обрав some
        textAreaData.value = 'Invalid data format in localStorage';
        throw new Error('Invalid data format in localStorage');
    }

    const index = param === 'name' ? 0 : 1;  // це зробив для динамічного викорситання сортування
    // name - по імені  value - по значенню

    const sortedArr = arr
        .sort((a, b) => { // просте сортування по довжині стрінги
            const aPart = a.split('=')[index] || '';
            const bPart = b.split('=')[index] || '';
            return aPart.length - bPart.length;
        });

    textAreaData.value = sortedArr.join('\n'); // вивід результату
}

