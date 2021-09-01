// basic implementation of a hash table

class HashTable {
	constructor() {
		this.values = {};
		this.length = 0;
		this.size = 0;
	}
	// hashing function
	calculateHash(key) {
		return key.toString().length % this.size;
	}
	//insert key-value pairs into the hash table
	add(key, value)	{
		const hash = this.calculateHash(key);

		if (!this.values.hasOwnProperty(hash)) {
			this.values[hash] = {};
		}
		if (!this.values[hash].hasOwnProperty(key)) {
			this.length++;
		}
		this.values[hash][key] = value;
	}
	// search for value in hash table using key
	search(key) {
		const hash = this.calculateHash(key);

		if (this.values.hasOwnProperty(hash) && this.values[hash].hasOwnProperty(key)) {
			return this.values[hash][key];
		} else {
			return null;
		}
	}
}

// alternate implementation with collision avoidance via buckets

class HashTable {
	constructor() {
		this.table = new Array(127);
		this.size = 0;
	}
	// hashing function
	_calculateHash(key) {
		let hash = 0;
		for (let i = 0; i < key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash % this.table.length;
	}
	// add key-value pair into the table
	add(key, value) {
		const index = this._calculateHash(key);

		if (this.table[index]) {
			for (let i = 0; i < this.table[index].length; i++) {
				if (this.table[index][i][0] === key) {
					this.table[index][i][1] = value;
					return;
				}
			}
			this.table[index].push([key, value]);
		} else {
			this.table[index] = [];
			this.table[index].push([key, value]);
		}
		this.size++;
	}
	// retrieve a value from the table via its key
	get(key) {
		const target = this._calculateHash(key);

		if (this.table[target]) {
			for (let i = 0; i < this.table.length; i++) {
				if (this.table[target][i][0] === key) {
					return this.table[target][i][1];
				}
			}
		}
		return undefined;
	}
	// remove a value from the table via its key
	remove(key) {
		const index = this._calculateHash(key);

		if (this.table[index] && this.table[index].length) {
			for (let i = 0; i < this.table.length; i++) {
				if (this.table[index][i][0] === key) {
					this.table[index].splice(i, 1);
					this.size--;
					return true;
				}
			}
		} else {
			return false;
		}
	}
	// print each key-value paired stored in the hash table
	print() {
		this.table.forEach((values, index) => {
			const chainedValues = values.map(([key, value]) => `[ ${key}: ${value} ]`);
			console.log(`${index}: ${chainedValues}`);
		});
	}
}