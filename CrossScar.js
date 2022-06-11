export default class Scar {
	constructor(options) {
		this.parent = options.parent

		return this
	}

	append(element) {
		this.tempElem = document.createElement(element.type)
		if (element.props) {
			element.props.forEach(prop => {
				this.tempElem.setAttribute(prop.prop, prop.value)
			})
		}
		if (element.html) {
			this.tempElem.innerHTML = element.html
		} else {
			this.tempElem.innerHTML = ""
		}

		this.parent.appendChild(this.tempElem)
		
		return new Scar({ parent: this.tempElem })
	}

	get elem() {
		return this.parent
	}

	get innerHTML() {
		return this.parent.innerHTML
	}

	set innerHTML(value) {
		this.parent.innerHTML = value
	}

	get value() {
		return this.parent.value
	}

	set value(value) {
		this.parent.value = value
	}

	get type() {
		return this.parent.nodeName
	}

	return() {
		this.append({ type: "br" })
		return this
	}

	css(file) {
		this.tempElem = document.createElement("link")
		this.tempElem.setAttribute("href", file)
		this.tempElem.setAttribute("rel", "stylesheet")
		this.tempElem.setAttribute("type", "text/css")

		document.head.appendChild(this.tempElem)
	}
}