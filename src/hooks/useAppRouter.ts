import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function useAppRouter(): {
  isHome: boolean;
  pathName: string;
} {
  const pathName = usePathname();
  const isHome = useMemo(() => {
    return pathName === '/';
  }, [pathName]);

  return { isHome, pathName };
}
