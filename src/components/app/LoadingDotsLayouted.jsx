import AppLayout from '@/components/app/AppLayout';
import DotsLoader from '@/components/spinners/dots';

export default function LoadingDotsLayouted() {
  return (
    <AppLayout>
      <DotsLoader alone />
    </AppLayout>
  );
}
