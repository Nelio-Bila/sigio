import AuthHeader from '@/components/auth-header';

export default function AuthLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <AuthHeader />
      {children}
    </>
  )
}
