import { AppState, AppAction } from './types';

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'UPLOAD_START':
      return {
        status: 'uploading',
        fileName: action.fileName,
      };

    case 'UPLOAD_COMPLETE':
      if (state.status !== 'uploading') return state;
      return {
        status: 'processing',
        fileName: state.fileName,
      };

    case 'PROCESS_SUCCESS':
      return {
        status: 'success',
        report: action.report,
      };

    case 'PROCESS_ERROR':
      return {
        status: 'error',
        message: action.message,
      };

    case 'RESET':
      return { status: 'idle' };

    default:
      return state;
  }
}
