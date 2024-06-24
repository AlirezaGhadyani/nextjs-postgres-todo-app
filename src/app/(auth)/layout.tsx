export default function AuthRootLayout({ children }: ChildrenComponent) {
  return (
    <main className="h-screen">
      <div className="h-full overflow-x-hidden overflow-y-auto text-center after:content-[''] after:w-0 after:h-full after:inline-block after:align-middle">
        <div className="relative inline-block w-full px-4 text-left align-middle sm:max-w-md lg:max-w-lg">
          <div className="w-full p-8 md:p-12 rounded-xl bg-zinc-100 dark:bg-zinc-900">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
