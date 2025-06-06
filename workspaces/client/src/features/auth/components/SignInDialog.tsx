import { BetterFetchError } from '@better-fetch/fetch';
import { FORM_ERROR } from 'final-form';
import { useId } from 'react';
import { Field, Form } from 'react-final-form';
import { z } from 'zod';

import { useAuthActions } from '@wsh-2025/client/src/features/auth/hooks/useAuthActions';
import { isValidEmail } from '@wsh-2025/client/src/features/auth/logics/isValidEmail';
import { isValidPassword } from '@wsh-2025/client/src/features/auth/logics/isValidPassword';
import { Dialog } from '@wsh-2025/client/src/features/dialog/components/Dialog';

interface SignInFormValues {
  email: string;
  password: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
}

export const SignInDialog = ({ isOpen, onClose, onOpenSignUp }: Props) => {
  const authActions = useAuthActions();
  const emailId = useId();
  const passwordId = useId();

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await authActions.signIn({
        email: values.email,
        password: values.password,
      });

      alert('ログインに成功しました');
      onClose();
      return;
    } catch (e) {
      if (e instanceof BetterFetchError && e.status === 401) {
        return { [FORM_ERROR]: 'アカウントが存在しないか入力した情報が間違っています' };
      }
      return { [FORM_ERROR]: '不明なエラーが発生しました' };
    }
  };

  return (
			<Dialog isOpen={isOpen} onClose={onClose}>
				<div className="size-full">
					<div className="mb-[16px] flex w-full flex-row justify-center">
						<img
							className="object-contain"
							height={36}
							src="/public/arema.svg"
							width={98}
						/>
					</div>

					<h2 className="mb-[24px] text-center text-[24px] font-bold">
						ログイン
					</h2>

					<Form
						validate={(values) => {
							const schema = z.object({
								email: z
									.string({
										required_error: "メールアドレスを入力してください",
									})
									.and(
										z.custom(isValidEmail, {
											message: "メールアドレスが正しくありません",
										}),
									),
								password: z
									.string({ required_error: "パスワードを入力してください" })
									.and(
										z.custom(isValidPassword, {
											message: "パスワードが正しくありません",
										}),
									),
							});
							const result = schema.safeParse(values);
							return result.success
								? undefined
								: result.error.formErrors.fieldErrors;
						}}
						onSubmit={onSubmit}
					>
						{({
							handleSubmit,
							hasValidationErrors,
							submitError,
							submitting,
						}) => (
							<form
								className="mb-[16px]"
								onSubmit={(ev) => void handleSubmit(ev)}
							>
								<Field name="email">
									{({ input, meta }) => {
										return (
											<div className="mb-[24px]">
												<div className="mb-[8px] flex flex-row items-center justify-between text-[14px] font-bold">
													<label className="shrink-0 grow-0" htmlFor={emailId}>
														メールアドレス
													</label>
													{meta.modified && Array.isArray(meta.error) ? (
														<span className="shrink-0 grow-0 text-[#F0163A]">
															{meta.error[0]}
														</span>
													) : null}
												</div>
												<input
													{...input}
													required
													className="w-full rounded-[4px] border-[2px] border-solid border-[#FFFFFF1F] bg-[#FFFFFF] p-[12px] text-[14px] text-[#212121] placeholder:text-[#999999]"
													id={emailId}
													placeholder="メールアドレスを入力"
													type="email"
												/>
											</div>
										);
									}}
								</Field>

								<Field name="password">
									{({ input, meta }) => {
										return (
											<div className="mb-[24px]">
												<div className="mb-[8px] flex flex-row items-center justify-between text-[14px] font-bold">
													<label
														className="shrink-0 grow-0"
														htmlFor={passwordId}
													>
														パスワード
													</label>
													{meta.modified && Array.isArray(meta.error) ? (
														<span className="shrink-0 grow-0 text-[#F0163A]">
															{meta.error[0]}
														</span>
													) : null}
												</div>
												<input
													{...input}
													required
													className="w-full rounded-[4px] border-[2px] border-solid border-[#FFFFFF1F] bg-[#FFFFFF] p-[12px] text-[14px] text-[#212121] placeholder:text-[#999999]"
													id={passwordId}
													placeholder="パスワードを入力"
													type="password"
												/>
											</div>
										);
									}}
								</Field>

								{submitError ? (
									<div className="mb-[8px] flex w-full flex-row items-center justify-start rounded-[4px] border-[2px] border-solid border-[#F0163A] bg-[#ffeeee] p-[8px] text-[14px] font-bold text-[#F0163A]">
										<div className="m-[4px] size-[20px]">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												height="20px"
												viewBox="0 -960 960 960"
												width="20px"
												fill="#F0163A"
											>
												<path d="M479.79-288q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM444-432h72v-240h-72v240Zm36.28 336Q401-96 331-126t-122.5-82.5Q156-261 126-330.96t-30-149.5Q96-560 126-629.5q30-69.5 82.5-122T330.96-834q69.96-30 149.5-30t149.04 30q69.5 30 122 82.5T834-629.28q30 69.73 30 149Q864-401 834-331t-82.5 122.5Q699-156 629.28-126q-69.73 30-149 30Zm-.28-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
											</svg>
										</div>
										<span>{submitError}</span>
									</div>
								) : null}

								<div className="flex flex-row justify-center">
									<button
										className="block flex w-[160px] flex-row items-center justify-center rounded-[4px] bg-[#1c43d1] p-[12px] text-[14px] font-bold text-[#ffffff] disabled:opacity-50"
										disabled={submitting || hasValidationErrors}
										type="submit"
									>
										ログイン
									</button>
								</div>
							</form>
						)}
					</Form>

					<div className="flex flex-row justify-center">
						<button
							className="block bg-transparent text-[14px] text-[#999999] underline"
							type="button"
							onClick={onOpenSignUp}
						>
							アカウントを新規登録する
						</button>
					</div>
				</div>
			</Dialog>
		);
};
