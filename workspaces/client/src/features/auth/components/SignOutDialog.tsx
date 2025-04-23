import { FORM_ERROR } from 'final-form';
import { Form } from 'react-final-form';

import { useAuthActions } from '@wsh-2025/client/src/features/auth/hooks/useAuthActions';
import { Dialog } from '@wsh-2025/client/src/features/dialog/components/Dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SignOutDialog = ({ isOpen, onClose }: Props) => {
  const authActions = useAuthActions();

  const onSubmit = async () => {
    try {
      await authActions.signOut();

      alert('ログアウトしました');
      onClose();
      return;
    } catch {
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
						ログアウト
					</h2>

					<Form onSubmit={onSubmit}>
						{({ handleSubmit, submitError }) => (
							<form
								className="mb-[16px]"
								onSubmit={(ev) => void handleSubmit(ev)}
							>
								<div className="mb-[24px] flex w-full flex-row items-center justify-start rounded-[4px] border-[2px] border-solid border-[#DDAA00] bg-[#fffcee] p-[8px] text-[14px] font-bold text-[#DDAA00]">
									<div className="m-[4px] size-[20px]">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											height="20px"
											viewBox="0 -960 960 960"
											width="20px"
											fill="#DDAA00"
										>
											<path d="M111.91-144q-10.91 0-19.13-4.95Q84.57-153.9 80-162q-5-8-4.5-18t5.5-19l368-614q5-9 13.53-13 8.52-4 17.5-4 8.97 0 17.47 4 8.5 4 13.5 13l368 614q5 9 5.5 19t-4.5 18q-5 8-13 13t-18.91 5H111.91ZM175-216h610L480-724 175-216Zm304.79-48q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5Zm0-120q15.21 0 25.71-10.35T516-420v-120q0-15.3-10.29-25.65Q495.42-576 480.21-576t-25.71 10.35Q444-555.3 444-540v120q0 15.3 10.29 25.65Q464.58-384 479.79-384Zm.21-86Z" />
										</svg>
									</div>
									<span>プレミアムエピソードが視聴できなくなります。</span>
								</div>

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
										type="submit"
									>
										ログアウト
									</button>
								</div>
							</form>
						)}
					</Form>
				</div>
			</Dialog>
		);
};
