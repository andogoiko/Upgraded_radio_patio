
// @see https://stackoverflow.com/a/2091331
const getQueryVariable = variable => {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return false;
}

// @see https://stackoverflow.com/a/10997390
const updateURLParameter = (url, param, paramVal) => {
    let TheAnchor;
    let newAdditionalURL = '';
    let tempArray = url.split('?');
    let baseURL = tempArray[0];
    let additionalURL = tempArray[1];
    let temp = '';

    if (additionalURL) {
        const tmpAnchor = additionalURL.split('#');
        const TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];
        if (TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split('&');

        for (let i=0; i<tempArray.length; i++) {
            if (tempArray[i].split('=')[0] !== param) {
                newAdditionalURL += temp + tempArray[i];
                temp = '&';
            }
        }
    } else {
        const tmpAnchor = baseURL.split('#');
        const TheParams = tmpAnchor[0];
        TheAnchor = tmpAnchor[1];

        if (TheParams)
            baseURL = TheParams;
    }

    if (TheAnchor)
        paramVal += '#' + TheAnchor;

    const rows_txt = temp + '' + param + '=' + paramVal;
    return baseURL + '?' + newAdditionalURL + rows_txt;
};

const setSkin = el => {
    const header = document.querySelector('.navbar');
    let t = getQueryVariable('t');
    if (t) {
        for (const skin in skins) {
            if (skins[skin] === t) {
                document.body.classList.remove('bg-' + t);
                header.classList.remove('bg-' + t, 'navbar-' + t);
            } else {
                t = skins[skin];
                document.body.classList.add('bg-' + t);
                header.classList.add('bg-' + t, 'navbar-' + t);
                break;
            }
        }
    } else {
        t = 'light';
        document.body.classList.remove('bg-dark');
        header.classList.remove('bg-dark', 'navbar-dark');
        document.body.classList.add('bg-light');
        header.classList.add('bg-light', 'navbar-light');
    }
    darkmode.inDarkMode = t === 'dark';
    el.href = updateURLParameter(window.location.href, 't', t);
    document.querySelector('.logo').textContent = t === 'dark' ? 'nights_stay' : 'wb_sunny';
};

const skins = ['dark', 'light'];
const el = document.querySelector('.invert_color');

el.addEventListener('click', ev => setSkin(ev.target));
setSkin(el);