import './Unit.css';

const Unit = (props) => {
    // Create number to className dictionary.
    let numToClass = {0: 'a0'};
    let idx = 1;
    for (let step = 1; step <= 17; step++) {
        idx = idx * 2;
        numToClass[idx] = 'a' + String(idx);
    }
    // Default className.
    const defClass = ' gridDim gridOther';

    return (
        <>
            {props.grid > 0 ? <div className={numToClass[props.grid] + defClass}>{props.grid}</div> : <></>}
        </>
    );
}

export default Unit;