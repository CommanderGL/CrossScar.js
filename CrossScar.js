"use strict"

const components = [
	function text() {
		return CreateElem({ type: "input", props: { type: "text" } })
	}
]
const customEvents = []

export default class Scar {
	constructor(options) {
		this.parent = options.parent

		return this
	}

	append(element) {
		components.forEach(cb => {
			if (cb.name == element.type) {
				this.component = cb(element.props, element.html, element.children)
			}
		})
		if (this.component) {
			if (typeof this.component == "array") {
				if (this.component.length == 1) {
					this.tempElem = this.component[0]
				} else {
					this.tempElem = document.createElement("div")
					this.tempElem.classList.add(element.type)
					this.component.forEach(child => {
						this.tempElem.appendChild(child)
					})
				}
			} else {
				this.tempElem = this.component
			}
		} else {
			this.tempElem = document.createElement(element.type)
		}

		if (element.props && !this.component) {
			Object.entries(element.props).forEach(([key, value] = entrie) => {
				this.tempElem.setAttribute(key, value)
			})
		}

		if (element.events) {
			element.events.forEach(event => {
				customEvents.forEach(customEvent => {
					if (customEvent.name == event.name) {
						this.customEvent = customEvent
					}
				})
				if (this.customEvent && event.isCustom == true) {
					this.tempElem.addEventListener(this.customEvent.baseEvent, this.customEvent.cb)
				} else {
					this.tempElem.addEventListener(event.name, e => {
						event.cb(e)
					})
				}
			})
		}

		if ( element.children && !this.component ) {
			element.children.forEach(child => {
				this.tempElem.appendChild(child)
			})
		}
		
		if (element.html && !this.component) {
			this.tempElem.innerHTML = element.html
		} else {
			if (!this.component) {
				this.tempElem.innerHTML = ""
			}
		}

		if (element.css) {
			Object.entries(element.css).forEach(([key, value] = entrie) => {
				eval(`this.tempElem.style.${key} = "${value}"`)
			})
		}

		this.parent.appendChild(this.tempElem)

		return new Scar({ parent: this.tempElem })
	}

	appendElem(elem) {
		this.parent.appendChild(elem)
	}

	getElem() {
		return this.parent
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

	line() {
		this.append({ type: "hr" })
		return this
	}

	addEvent(event, cb) {
		this.parent.addEventListener(event, e => {
			cb(e)
		})
	}

	getChildren() {
		return [...this.parent.children]
	}

	get children() {
		return [...this.parent.children]
	}

	getProp(prop) {
		return this.parent.getAttribute(prop)
	}

	setProp(prop, value) {
		return this.parent.setAttribute(prop, value)
	}

	setCss(prop, value) {
		eval(`this.parent.style.${prop} = "${value}"`)
		return this
	}

	getCss(prop) {
		return eval(`this.parent.style.${prop}`)
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

export function CreateComponent(cb) {
	if (cb.name[0].toUpperCase() == cb.name[0]) {
		components.push(cb)
	} else {
		throw `Error Component Name Must Start With An Uppercase.		Component "${cb.name}" Did Not Start With An Uppercase.`
	}
}

export function CreateElem(options) {
	tempElem = document.createElement(options.type)
	if (options.html) {
		tempElem.innerHTML = options.html
	} else {
		tempElem.innerHTML = ""
	}

	if (options.props) {
		Object.entries(options.props).forEach(([key, value] = entrie) => {
			tempElem.setAttribute(key, value)
		})
	}

	if (options.css) {
		Object.entries(options.css).forEach(([key, value] = entrie) => {
			eval(`tempElem.style.${key} = "${value}"`)
		})
	}

	if (options.children) {
		options.children.forEach(child => {
			tempElem.appendChild(child)
		})
	}

	return tempElem
}

export function CreateEvent(options) {
	customEvents.push(options)
	/*
		syntax:
			{ name: $name, baseEvent: $event, cb: $cb }
	*/
}

export function CreateReturnElem() {
	return document.createElement("br")
}

export function CreateLineElem() {
	return document.createElement("hr")
}