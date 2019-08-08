<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use AppBundle\Entity\Categories;

class CategoriesController extends Controller { /**
 * @Route("/categorias", name="categories",methods={"GET"})
 * 
 */

    public function indexAction() {
        return $this->render('categories/categories.html.twig');
    }

    /**
     * @Route("/showcategories", name="categories_show",methods={"GET"})
     * 
     */
    public function showcategoriesAction() {

        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];

        $serializer = new Serializer($normalizers, $encoders);
        $em = $this->getDoctrine()->getManager();
        $repository = $em->getRepository('AppBundle:Categories');
        $Categories = $repository->findAll();
        $jsonCategories = $serializer->serialize($Categories, 'json');

        return new Response($jsonCategories);
    }

    /**
     * @Route("/savecategory", name="categories_save",methods={"POST"})
     * 
     */
    public function registercategoryAction(Request $request) {


        $code = $request->get("code");
        $name = $request->get('name');
        $em = $this->getDoctrine()->getManager();
        $dql = "select a from AppBundle:Categories a where a.code=:code or a.name=:name";
        $query = $em->createQuery($dql);
        $query->setParameter('code', $code);
        $query->setParameter('name', $name);
        $serchcategori = $query->getResult();

        if (count($serchcategori) != "0") {
            return new Response("este codigo o nombre ya estan registrados ");
        } else {

            $description = $request->get('description');
            $active = '1';
            $categories = new Categories();
            $categories->setCode($code);
            $categories->setName($name);
            $categories->setDescription($description);
            $categories->setActive($active);

            $em->persist($categories);
            $em->flush();
            return new Response("operacion exitosa");
        }
    }

    /**
     * @Route("/showedit", name="categories_showedit",methods={"POST"})
     * 
     */
    public function listedit(Request $request) {
        $id = $request->get("id");

        $repository = $this->getDoctrine()
                ->getManager()
                ->getRepository('AppBundle:Categories');

        $editcategory = $repository->findOneBy(array('id' => $id));

        //var_dump($editcategory);
        return $this->render('categories/editcategories.html.twig', array("category" => $editcategory));
    }

    /**
     * @Route("/updatecategory", name="categories_update",methods={"POST"})
     * 
     */
    public function updatecategory(Request $request) {
        $id = $request->get("id");
        $code = $request->get("code");
        $name = $request->get('name');
        $description = $request->get('description');
        $active = $request->get('status');

           $em = $this->getDoctrine()->getManager();
            $categories = $em->getRepository('AppBundle:Categories')->find($id);
            $categories->setCode($code);
            $categories->setName($name);
            $categories->setDescription($description);
            $categories->setActive($active);
            $em->flush();
            return new Response("operacion exitosa");
    
    }

    /**
     * @Route("/deletecategory", name="categories_delete",methods={"POST"})
     * 
     */
    public function deletecategory(Request $request) {

        $id = $request->get("id");
        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('AppBundle:Categories')->find($id);
        $em->remove($categories);
        $em->flush();
          return new Response("operacion exitosa");
    }

}
