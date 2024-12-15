import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { screenWidthAlertProps } from "../utils/types"
import { useTranslation } from "react-i18next"
  

export function CheckScreenWidthAlert(props: screenWidthAlertProps) {
    const { t } = useTranslation('common')
    return (
      <AlertDialog open={props.open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("message.portrait_mode")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("message.landscape_orientation")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-primary-950" onClick={()=>props.setOpen(false)}>{t("message.yes")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  