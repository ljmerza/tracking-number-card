import { css } from 'lit-element';

const style = css`
    .entities {
        padding-top: 20px;
    }

    .checkbox-options:first-of-type {
        margin-top: 10px;
    }
    .checkbox-options:last-of-type {
        margin-bottom: 10px;
    }

    .checkbox-options paper-checkbox {
        margin-top: 5px;
        width: 50%;
    }

    .entities paper-checkbox {
        display: block;
        margin-bottom: 10px;
        margin-left: 10px;
    }

    .common-entity-options {
        width: 90%;
        margin-left: 7%;
        display: flex;
    }

    .common-entity-options .units-input {
        margin-top: -20px;
    }
`;

export default style;