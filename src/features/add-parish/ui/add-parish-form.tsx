"use client"

import {
  ModalActionButton,
  ModalBody,
  ModalCancelButton,
  ModalContents,
  ModalFooter,
  ModalHeader,
  Input,
  Calendar,
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Textarea,
  Popover,
  PopoverTrigger,
  Button,
  cn,
  PopoverContent,
  AppLocale,
  dateFnsLocales,
  useTranslate,
} from "@/shared"
import { format } from "date-fns"
import { parishFormSchema, type ParishFormValues } from "../index"
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react";

export const AddParishForm = ({ closeModalAction }: { closeModalAction: () => void }) => {
  const t = useTranslations('parishe');
  const { translate, isLoading: isTranslating } = useTranslate();
  const [isPending, startTransition] = useTransition()
  const currentLocale = useLocale() as AppLocale;

  const form = useForm<ParishFormValues>({
    resolver: zodResolver(parishFormSchema),
    defaultValues: {
      deliveryDate: new Date(),
      translations: {
        ru: { locale: 'ru', title: "", description: "" },
        en: { locale: 'en', title: "", description: "" },
      }
    },
  })

  const handleTranslate = async () => {
    const ruTitle = form.getValues('translations.ru.title');
    if (!ruTitle) return;

    try {
      const enTitle = await translate(ruTitle, 'en');
      form.setValue('translations.en.title', enTitle);
    } catch (err) {
      console.error("Translation error:", err);
    }
  };

  const onSubmit = useCallback(
    (values: ParishFormValues) => {
      startTransition(async () => {
        console.log(values)
        // await createParish(values)
      })
    }, [])

  return (
    <ModalContents>
      <ModalHeader title={t('form-created.title')} />
      <ModalBody>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full gap-7 pb-7">

            {/* Language Tabs */}
            <Tabs defaultValue="ru" onValueChange={(val) => { }} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger className="cursor-pointer" value="ru">{t('form-created.russian')}</TabsTrigger>
                <TabsTrigger className="cursor-pointer" value="en">{t('form-created.english')}</TabsTrigger>
              </TabsList>

              {/* Russian Translation */}
              <TabsContent value="ru" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="translations.ru.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-3">{t('form-created.fields.title')} (RU)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form-created.placeholders.title')}
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="translations.ru.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-3">{t('form-created.fields.description')} (RU)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('form-created.placeholders.description')}
                          className="resize-none min-h-25"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* English Translation */}
              <TabsContent value="en" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="translations.en.title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-3">{t('form-created.fields.title')} (EN)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t('form-created.placeholders.title')}
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="translations.en.description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="mb-3">{t('form-created.fields.description')} (EN)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={t('form-created.placeholders.description')}
                          className="resize-none min-h-25"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            {/* Delivery Date Picker */}
            <FormField
              control={form.control}
              name="deliveryDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-3">{t('form-created.fields.delivery-date')}</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                          disabled={isPending}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: dateFnsLocales[currentLocale] })
                          ) : (
                            <span>{t('form-created.placeholders.delivery-date')}</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={dateFnsLocales[currentLocale]}
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        autoFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </ModalBody>
      <ModalFooter>
        <ModalCancelButton
          onCancelAction={closeModalAction}>
          {t('form-created.buttons.cancel')}
        </ModalCancelButton>
        <ModalActionButton
          onConfirmAction={form.handleSubmit(onSubmit)}
          variant="simply-accent"
          disabled={isPending}>
          {t('form-created.buttons.create')}
        </ModalActionButton>
      </ModalFooter>
    </ModalContents>
  )
}