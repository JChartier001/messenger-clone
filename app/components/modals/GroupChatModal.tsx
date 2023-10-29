"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import Modal from "./Modal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../inputs/Input";
import Select from "../inputs/Select";
import Button from "../Button";

interface GroupChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
  isOpen,
  onClose,
  users,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data, "data")
    axios
      .post("/api/conversations", { ...data, isGroup: true })
      .then((response) => {
        onClose();
        router.refresh();
        console.log(response, "response")
        router.push(`/conversations/${response.data.id}`);
      })
      .catch((error) => {
        toast.error(`Something went wrong: ${error?.response?.data?.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						<h2 className='text-base font-semibold leading-7 text-gray-900'>
							{' '}
							Create a group chat
						</h2>
						<p className='mt-1 text-sm leading-6 text-gray-600'>
							Create a chat with more than 2 people
						</p>
						<div className='mt-10 flex flex-col gap-y-8'>
							<Input
								register={register}
								id='name'
								label='Chat Name'
								disabled={isLoading}
								required
								errors={errors}
							/>
							<Select
								disabled={isLoading}
								label='Members'
								options={users.map(user => ({
									label: user.name,
									value: user.id,
								}))}
								register={register}
								id='members'
								required
								onChange={value =>
									setValue('members', value, { shouldValidate: true })
								}
								value={members}
							/>
						</div>
					</div>
				</div>
				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<Button
						type='button'
						disabled={isLoading}
						onClick={onClose}
						secondary
					>
						Cancel
					</Button>
					<Button
						type='submit'
						disabled={isLoading}
						
					>
						Create Chat
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default GroupChatModal;
