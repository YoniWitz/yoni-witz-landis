module.exports = class StringUtil {
    static isEmpty(value) {
        return typeof value === "string" ? !value || !value.trim() : !value;
    }

    static capitalize(word) {
        return word.charAt(0).toUpperCase();
    }
}