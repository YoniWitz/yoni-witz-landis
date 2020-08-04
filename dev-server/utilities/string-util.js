module.exports = class StringUtil {
    static isEmpty(value) {
        if (typeof value === "string")
            return !value || !value.trim();
        else {
            return !value;
        }
    }

    static capitalize(word) {
        return word.charAt(0).toUpperCase();
    }
}