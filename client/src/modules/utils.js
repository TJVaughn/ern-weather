export const toPercent = (dec) => {
    return Math.round(dec * 100);
}

export const callWeatherAPI = async(input) => {
    const encodedInput = encodeURIComponent(input)
    const response = await fetch(`/weather?address=${encodedInput}`)
    const body = await response.json();
    return body;
}
