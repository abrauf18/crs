import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

function CheckResource({ data }: { data: any }) {
    const url = data?.assessmentAnswer?.assessmentAnswers[0].answerURL;
    return (
        <>
            {' '}
            <Label className=" text-lg mb-1">
                Total Marks: {data?.assessmentAnswer?.totalMarks}{' '}
            </Label>
            <div className="flex gap-2">
                <Input
                    type="number"
                    className="!w-1/2"
                    placeholder="Marks Obtained"
                />
                <Button>Submit</Button>
            </div>
            <div className="w-full mt-5 h-screen flex flex-col justify-center items-center">
                <iframe
                    title="Answer"
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                        url as string
                    )}`}
                    width="100%"
                    height="100%"
                    loading="lazy"
                />
            </div>
        </>
    );
}

export default CheckResource;
