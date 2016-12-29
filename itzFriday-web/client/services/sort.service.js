export default {

	getSortedName() {
		var op = Array.prototype.sort.call(arguments, myCustomSort);
		console.log(op);
		return op;
	}
}

function myCustomSort(a, b) {
        return (a.toLowerCase() > b.toLowerCase()) ? 1 : -1;
    }