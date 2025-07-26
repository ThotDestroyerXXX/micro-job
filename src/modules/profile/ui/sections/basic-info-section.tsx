"use client";
import GuestAvatar from "@/components/guest-avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Session } from "@/lib/auth";
import { Calendar, CheckCircle, Edit, MapPin } from "lucide-react";
import { useState } from "react";
import { useUpdateUserProfile } from "../../hooks/use-profile-hook";
import { BASIC_INFORMATION_FORM_FIELDS } from "../../config/profile.config";
import { FormFieldWrapper } from "@/modules/auth/ui/components/form-field-wrapper";
import { formatDate } from "@/lib/utils";

export default function BasicInfoSection({
  user,
}: Readonly<{
  user: Session["user"];
}>) {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { form, onSubmit, isLoading } = useUpdateUserProfile({
    setIsEditingProfile,
  });

  return (
    <section>
      <Card>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => onSubmit(values))}>
              <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex flex-col items-center'>
                  {user.image ? (
                    <Avatar className='h-32 w-32 mb-4'>
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                  ) : (
                    <GuestAvatar className='h-32 w-32 mb-4' />
                  )}
                  {isEditingProfile ? (
                    <Button
                      type='submit'
                      className='w-full'
                      size='sm'
                      disabled={isLoading}
                    >
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  ) : (
                    <Button
                      size='sm'
                      type='button'
                      variant='outline'
                      disabled={isLoading}
                      onClick={() => setIsEditingProfile(!isEditingProfile)}
                    >
                      <Edit className='h-4 w-4 mr-2' />
                      Edit Profile
                    </Button>
                  )}
                </div>
                <div className='flex-1 space-y-4'>
                  {isEditingProfile ? (
                    <>
                      {BASIC_INFORMATION_FORM_FIELDS.map((field) => (
                        <FormFieldWrapper
                          key={field.name}
                          control={form.control}
                          name={field.name}
                          label={field.label}
                          placeholder={field.placeholder}
                          type={field.type}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      <div>
                        <h1 className='text-3xl font-bold'>{user.name}</h1>
                        <p className='text-muted-foreground'>{user.username}</p>
                      </div>

                      <p className='text-gray-600'>
                        {user.bio && user.bio.length > 0
                          ? user.bio
                          : "No bio written yet..."}
                      </p>

                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
                        <div className='flex items-center gap-2'>
                          <Calendar className='h-4 w-4 text-muted-foreground' />
                          <span>Member since {formatDate(user.createdAt)}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                          <MapPin className='h-4 w-4 text-muted-foreground' />
                          <span>
                            {user.location && user.location.length > 0
                              ? user.location
                              : "No location"}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Verifications */}
                  <div className='flex flex-wrap gap-2'>
                    {user.emailVerified && (
                      <Badge
                        variant='outline'
                        className='text-green-600 border-green-200'
                      >
                        <CheckCircle className='h-3 w-3 mr-1' />
                        Email Verified
                      </Badge>
                    )}
                    {user.phoneNumberVerified && (
                      <Badge
                        variant='outline'
                        className='text-green-600 border-green-200'
                      >
                        <CheckCircle className='h-3 w-3 mr-1' />
                        Phone Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
