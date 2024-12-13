import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { screenWidthAlertProps } from "../utils/types"
  

export function CheckScreenWidthAlert(props: screenWidthAlertProps) {
    return (
      <AlertDialog open={props.open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>スマホを縦向きで使用していますか?</AlertDialogTitle>
            <AlertDialogDescription>
                チャートを最適に表示するには、スマホを横向きで使用してください。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-primary-950" onClick={()=>props.setOpen(false)}>はい</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  