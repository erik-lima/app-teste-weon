import store from '@/store';

const showSnackbarMessage = (text, color) => {
    store.dispatch('changeSnackbarData', {
        show : true,
        text : text,
        color : color
    });
};

function isValidZipCode(zip) {
    const formatted = /^[0-9]{5}-[0-9]{3}$/.test(zip);
    const unformatted = /^[0-9]{8}$/.test(zip);
    return formatted || unformatted;
}

export {
    showSnackbarMessage,
    isValidZipCode
};