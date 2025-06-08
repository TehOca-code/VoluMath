import { FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PDFDownloadProps {
  url: string
  title: string
}

export function PDFDownload({ url, title }: PDFDownloadProps) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="w-full">
      <Button variant="outline" className="w-full flex items-center gap-2">
        <FileDown className="h-4 w-4" />
        <span>Unduh PDF: {title}</span>
      </Button>
    </a>
  )
}
