import type { FC } from 'react';

import { Loader2Icon } from 'lucide-react';

const Loading: FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader2Icon className="animate-spin stroke-primary" size={30} />
    </div>
  );
};

export default Loading;