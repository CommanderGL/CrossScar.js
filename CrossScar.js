"use strict"

const components = []
const customEvents = []

export default class Scar {
	constructor(options) {
		this.parent = options.parent

		return this
	}

	append(element) {
		components.forEach(cb => {
			if (cb.name == element.type) {
				this.component = cb(element.props)
			}
		})
		if (this.component) {
			if (typeof this.component == "array") {
				if (this.component.length === 1) {
					this.tempElem = this.component[0]
				} else {
					this.tempElem = document.createElement("div")
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

		if (element.props) {
			element.props.forEach(prop => {
				this.tempElem.setAttribute(prop.prop, prop.value)
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

		if ( element.children ) {
			element.children.forEach(child => {
				this.tempElem.appendChild(child)
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
		return[...this.parent.children]
	}

	setProp(prop, value) {
		this.parent.setAttribute(prop, value)
	}

	getProp(prop) {
		this.parent.getAttribute(prop)
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
	components.push(cb)
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

const text = () => {
	return CreateElem({ type: "input", props: [{ prop: "type", value: "text" }] })
}

CreateComponent(text)

//Hi
