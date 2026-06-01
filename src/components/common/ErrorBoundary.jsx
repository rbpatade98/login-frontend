import { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-canvas px-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-16 h-16 mx-auto rounded-sm bg-accent-orange/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-accent-orange" />
            </div>
            <div className="space-y-2">
              <h2 className="text-[28px] font-medium text-ink tracking-[-0.42px] font-display">
                Something went wrong
              </h2>
              <p className="text-body text-[16px] leading-[20.8px] tracking-[-0.16px]">
                An unexpected error occurred. Please try again.
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-sm font-mono-caps text-[16px] leading-[16px] tracking-[0.08px] hover:bg-ink/90 transition-all duration-200 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
