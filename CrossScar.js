const components = []

export default class Scar {
	constructor(options) {
		this.parent = options.parent

		return this
	}

	append(element) {
		components.forEach(com => {
			if (com.type == element.type) {
				this.component = com
			}
		})
		if (this.component) {
			if (this.component.children.length == 1) {
				this.tempElem = this.component.children[0]
			} else {
				this.tempElem = document.createElement("div")
				this.tempElem.classList.add(element.type)
				this.component.children.forEach(child => {
					this.tempElem.appendChild(child)
				})
			}
		} else {
			this.tempElem = document.createElement(element.type)
		}

		if (element.props) {
			element.props.forEach(prop => {
				this.tempElem.setAttribute(prop.prop, prop.value)
			})
		}

		if (element.events) {
			element.events.forEach(event => {
				this.tempElem.addEventListener(event.name, e => {
					event.cb(e)
				})
			})
		}
		
		if (element.html) {
			this.tempElem.innerHTML = element.html
		} else {
			if (!this.component) {
				this.tempElem.innerHTML = ""
			}
		}

		this.parent.appendChild(this.tempElem)

		return new Scar({ parent: this.tempElem })
	}

	get elem() {
		return this.parent
	}

	get html() {
		return this.parent.innerHTML
	}

	set html(value) {
		this.parent.innerHTML = value
	}

	get value() {
		return this.parent.value
	}

	set value(value) {
		this.parent.value = value
	}

	get tag() {
		return this.parent.nodeName
	}

	return() {
		this.append({ type: "br" })
		return this
	}

	addEvent(event, cb) {
		this.parent.addEventListener(event, e => {
			cb(e)
		})
	}

	get children() {
		return this.parent.children
	}
}

var tempElem = null

export function Import(type, file) {
	if (type == "css") {
		tempElem = document.createElement("link")
		tempElem.setAttribute("href", file)
		tempElem.setAttribute("rel", "stylesheet")
		tempElem.setAttribute("type", "text/css")

		document.head.appendChild(tempElem)
	}

	if (type == "js") {
		tempElem = document.createElement("script")
		tempElem.setAttribute("src", file)
		tempElem.setAttribute("defer", true)

		document.head.appendChild(tempElem)
	}

	if (type == "jsModule") {
		tempElem = document.createElement("script")
		tempElem.setAttribute("src", file)
		tempElem.setAttribute("type", "module")

		document.head.appendChild(tempElem)
	}
}

const tempObject = {}
const ComponentOptions = null

export function CreateComponent(ComponentOptions) {
	tempObject.type = ComponentOptions.name
	tempObject.children = ComponentOptions.defaultChildren

	components.push(tempObject)
}

export function CreateElem(options) {
	tempElem = document.createElement(options.type)
	if (options.html) {
		tempElem.innerHTML = options.html
	} else {
		tempElem.innerHTML = ""
	}

	if (options.props) {
		options.props.forEach(prop => {
			tempElem.setAttribute(prop.prop, prop.value)
		})
	}

	return tempElem
}

export function CreateReturn() {
	return document.createElement("br")
}

CreateComponent({
	name: "text",
	defaultChildren: [
		CreateElem({ type: "input", props: [{ prop: "type", value: "text" }] })
	]
})