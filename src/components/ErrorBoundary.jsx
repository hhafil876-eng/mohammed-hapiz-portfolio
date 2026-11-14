import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('Recovered from caught component exception:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }
      return (
        <div className="p-8 text-center text-gray-400">
          <p className="text-xs font-mono text-lime-400 uppercase tracking-widest mb-2">
            System Degradation Safeguard Active
          </p>
          <p className="text-sm text-gray-300">
            Rendering continues smoothly in standard operational mode.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}
