// components/UploadStopwordsModal.jsx
import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function UploadStopwordsModal({ onUpload }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Upload size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Stopword File</DialogTitle>
        </DialogHeader>
        <input
          type="file"
          accept=".txt,.csv"
          onChange={onUpload}
          className="mt-4"
        />
      </DialogContent>
    </Dialog>
  );
}
