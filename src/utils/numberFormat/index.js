export const numberFormat = (value) =>
    new Intl.NumberFormat('IN-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value);
