
import { useContext } from 'react';
// The actual context and its provider are in AuthContext.tsx, 
// but we re-export the hook from here as a common pattern.
// However, to keep it simple and avoid circular dependencies,
// we just define the hook directly in AuthContext.tsx and import from there.
// This file is kept for structural convention, but we will use the one from the context file.
// In a larger app, this might be more fleshed out.

export { useAuth } from '../contexts/AuthContext';
