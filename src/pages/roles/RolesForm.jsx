import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useGetRoleByIdQuery,
} from '../../features/roles/roleApi'
import { useNavigate, useParams } from 'react-router-dom'

const roleSchema = Yup.object({
  name: Yup.string().required('Role name is required'),
})

export default function RoleForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  const { data: roleData } = useGetRoleByIdQuery(id, { skip: !isEdit })
  const [createRole] = useCreateRoleMutation()
  const [updateRole] = useUpdateRoleMutation()

  const initialValues = {
    name: roleData?.name || '',
  }

  const handleSubmit = async (values) => {
    if (isEdit) {
      await updateRole({ id, ...values })
    } else {
      await createRole(values)
    }
    navigate('/roles')
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? 'Edit Role' : 'Create Role'}
      </h2>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={roleSchema}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Role Name</label>
            <Field name="name" className="input w-full px-3 py-2 border rounded" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            {isEdit ? 'Update' : 'Create'}
          </button>
        </Form>
      </Formik>
    </div>
  )
}
