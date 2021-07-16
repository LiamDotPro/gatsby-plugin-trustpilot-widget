import React from "react"

let check

export default class TrustpilotContainer extends React.Component {
  constructor(props) {
    super(props)

    check = setInterval(this.loadLibrary.bind(this), 1000)
  }

  componentDidMount() {
    this.loadLibrary()
  }

  componentWillUnmount() {
    clearInterval(check)
  }

  loadLibrary() {
    if (typeof window !== "undefined" && window.Trustpilot) {
      window.Trustpilot.loadFromElement(this.props.reference.current, true)

      clearInterval(check)
    }
  }

  render() {
    const { theme, height, width, reference, template, business, username, defaultText } = this.props
    const language = this.props.language.toLowerCase()
    const culture = this.props.culture.toUpperCase()
    const domain = language === "en" ? "www" : language

    return (
      <div ref={reference} className="trustpilot-widget" data-locale={`${language}-${culture}`} data-template-id={template} data-businessunit-id={business} data-style-height={height} data-style-width={width} data-theme={theme}>
        <a href={`https://${domain}.trustpilot.com/review/${username}`} target="_blank" rel="noopener noreferrer">{defaultText}</a>
      </div>
    )
  }
}
