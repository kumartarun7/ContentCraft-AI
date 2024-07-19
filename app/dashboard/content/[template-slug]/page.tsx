"use client"
import React, { useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'



var moment = require('moment');

interface PROPS{
    params:{
        'template-slug':string
    }
}

const CreateContent =  (props:PROPS) => {
     const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==props.params['template-slug'])
    const [loading,setLoading]=useState(false);

    const [aiOutput,setAiOutput]=useState<string>('');
    const {user}=useUser();
    const router=useRouter();

    const {totalUsage, setTotalUsage} = useContext(TotalUsageContext)

    const GenrateAIContent=async (FormData:any)=>{
      

      // if(totalUsage>=10000){
      //   router.push('/dashboard/billing')
      //   return;
      // }
      




        setLoading(true);
         const SelectedPrompt=selectedTemplate?.aiPrompt;
         const FinalAIPrompt=JSON.stringify(FormData)+", "+SelectedPrompt
         const result=await chatSession.sendMessage(FinalAIPrompt);
         setAiOutput(result?.response.text());
         await SaveInDb(JSON.stringify(FormData),selectedTemplate?.slug,result?.response.text());
         setLoading(false);
    }
    console.log(moment().format('DD/MM/yyyy'))
    var date=String(moment().format('DD/MM/yyyy'));
    
    const SaveInDb=async(FormData:any,slug:any,aiResp:string)=>{
      try {
        const result=await db.insert(AIOutput).values({
          formData:FormData,
          templateSlug:slug,
          aiResponse:aiResp,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:date
         
  
        })
  
        console.log(result);
      } catch (error) {
        console.log(error);
      }
     
     
    }

  return (
    <div className='p-10'>
     <Link href={"/dashboard"}><Button><ArrowLeft/>Back</Button></Link>
      
        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5 '>
        <FormSection selectedTemplate={selectedTemplate} userFormInput={(v:any)=>GenrateAIContent(v)} loading={loading}/>
        <div className='col-span-2'> <OutputSection aiOutput={aiOutput}/></div>
        

        </div>
    </div>
  )
}

export default CreateContent
