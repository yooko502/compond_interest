
import { useTranslation } from 'react-i18next'

export const InvestmentHeaders = () => {
    const { t } = useTranslation('common')
    return (
        <div className="grid place-items-center h-full from-primary-300 to-primary-100 w-full bg-gradient-to-br">
            <span className="flex items-center justify-center">
                <h3 className="text-2xl text-[#ffffff] font-bold">{t("hearder_title")}</h3>
            </span>
        </div>
    )
}