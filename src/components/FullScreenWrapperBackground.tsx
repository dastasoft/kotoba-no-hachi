import Image from 'next/image'

const FullScreenBackground = ({
  children,
  imagePath = '/images/logo-horizontal.webp',
  imageAlt = 'Background',
  imageQuality = 100,
}: Readonly<{
  children: React.ReactNode
}> & { imagePath?: string; imageAlt?: string; imageQuality?: number }) => {
  return (
    <div className="relative h-full">
      <div className="fixed inset-0 -z-10">
        <Image
          src={imagePath}
          alt={imageAlt}
          className="object-cover opacity-15"
          fill
          priority
          sizes="100vw"
          quality={imageQuality}
        />
      </div>
      <div className="relative z-10 flex h-full flex-col">
        <main className="flex-grow">{children}</main>
      </div>
    </div>
  )
}

export default FullScreenBackground
