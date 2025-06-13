import validator from 'validator';


export const checkTextInputError = (fieldName: string, value: string | null, minLength: number): string => {
    let errorMsg = "";
    if (!value || value.trim().length === 0) {
        errorMsg = "Pole " + fieldName.toLowerCase() + " nie może być puste.";
    } else if (value.trim().length < minLength) {
        errorMsg = "Pole " + fieldName.toLowerCase() + " powinno zawierać przynajmniej " + minLength + " znaki.";
    }
    return errorMsg;
}

export const checkNumberInputError = (fieldName: string, value: string | null, min: number, max: number): string => {
    if (value === null || value === "") {
        return `Pole ${fieldName} jest wymagane.`;
    }
    if (Number(value) < min) {
        return `Pole ${fieldName} ma nieprawidłową wartość`
    }
    if (Number(value) > max) {
        return `Maksymalna ${fieldName} to ${max}.0.`
    }
    return "";
}

export const checkDetailsFieldError = (inputName: string, value: string | null): string => {
    switch (inputName) {
        case "year": {
            if (value === null || value === "") {
                return "Wybierz rok produkcji.";
            }
            break;
        }
        case "fuel": {
            if (value === null || value === "") {
                return "Wybierz rodzaj paliwa.";
            }
            break;
        }
        case "displacement": {
            return checkNumberInputError("pojemność silnika", value, 0.1, 5)
        }
        case "power": {
            return checkNumberInputError("moc silnika", value, 1, 1000)
        }
        case "mileage": {
            if (value === null || value === "") {
                return "Przebieg jest polem wymaganym.";
            }
            if (Number(value) < 1) {
                return "Nieprawidłowy przebieg."
            }
            break;
        }
    }
    return "";
}

export const checkMessageError = (str: string): string => {
    if (!str || str.trim().length === 0) {
        return "Wiadomość jest pusta.";
    }
    return "";
}

export const checkDescriptionError = (value: string, maxLetters: number): string => {
    const trimmedValue: string = value.trim();
    if (!trimmedValue || trimmedValue.length === 0) {
        return "Uzupełnij opis pojazdu.";
    }
    if (!trimmedValue || trimmedValue.length > maxLetters) {
        return `Przekrczono maksymalną długość opisu - ${maxLetters} znaków.`;
    }
    return "";
}

export const checkEmailError = (value: string): string => {
    let errorMsg = checkTextInputError("email", value, 3);
    if (errorMsg === "") {
        let atQty = 0;
        for (const char of value) {
            if (char === "@") {
                atQty++;
            }
        }
        if (atQty != 1) {
            errorMsg = "Pole email powinno zawierać dokładnie jeden znak @.";
        }
    }
    if (errorMsg === "" && !validator.isEmail(value)) {
        return "Podany adres email jest nieprawidłowy.";
    }
    return errorMsg;
}

export const validateImgFile = (file: File, maxFileSizeMB: number): string => {
    const trimmedName: string = file.name.trim();
    const sizeInMB: number = parseFloat((file.size / (1024 * 1024)).toFixed(2));
    if (!trimmedName || trimmedName.length === 0) {
        return "Podana nazwa pliku jest pusta.";
    }
    if (!trimmedName.toLowerCase().endsWith(".jpg") && !trimmedName.toLowerCase().endsWith(".jpeg")) {
        return "Dozwolone formaty plików to jpg i jpeg.";
    }
    if (sizeInMB > maxFileSizeMB) {
        return `Rozmiar pliku przekracza maksymalny dozwolony rozmiar - ${maxFileSizeMB}MB.`;
    }
    return "";
}