import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title ? `${title} | AuthSystem` : 'AuthSystem';
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
