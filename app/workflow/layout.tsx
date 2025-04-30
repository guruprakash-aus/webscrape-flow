import Logo from '@/components/Logo';
import { ModeToggle } from '@/components/ThemeModeToggle';
import { Separator } from '@/components/ui/separator';
import type { FC, ReactNode } from 'react';

type Props = { children: ReactNode };

const WorkflowLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col">
    {children}

    <Separator />

    <footer className="flex items-center justify-between p-2">
      <Logo fontSize="text-xl" iconSize={16} />
      <ModeToggle />
    </footer>
  </div>
  )
}

export default WorkflowLayout;